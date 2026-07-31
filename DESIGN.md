# Design document

This paper explains how the CineSeat app is put together and why each choice
was made. The setup and run steps live in readme.txt.

## Overview

CineSeat is a React Native app for the Tentwenty assessment. It has four
parts: a list of upcoming movies, a movie detail page with a full screen
trailer player, a search page, and a seat selection flow that is user
interface only.

The app talks to The Movie Database for all real data. Cinema data such as
show times and seat availability does not exist in that API, so those parts
are generated inside the app.

The demo folder in the repository holds a screen recording that walks through
every screen described below.

## Goals

1. Match the supplied Figma design as closely as possible.
2. Keep each feature readable on its own.
3. Keep the API key out of the repository.
4. Handle slow networks and missing data without breaking the layout.

## Technical choices

### React Native 0.86 with the New Architecture

The project was created on React Native 0.86.2 with React 19.2.3, and the New
Architecture is on. This mattered when picking libraries, because several
popular packages have not been updated for it yet.

One example is react-native-linear-gradient. The current stable release is
from 2023 and predates the New Architecture, so it was left out. React Native
0.86 can draw gradients on its own through the experimental_backgroundImage
style property, and that is what the app uses for the dark fade over the
poster art. One less native dependency to install and one less thing to break.

### TypeScript everywhere

Every file is typed. Route names and their parameters are typed too, so
passing the wrong thing into a screen is caught while writing the code rather
than at run time.

### Axios for network calls

A single client in src/services/apiClient.ts holds the base address, a
timeout, and two interceptors.

The first interceptor adds the API key to every request. No call site has to
remember it, and there is one place to change if the way the key is sent ever
changes.

The second interceptor turns every failure into one small ApiError type that
carries a message a screen can show directly. Without this, each screen would
have to dig through an Axios error to work out what went wrong. Two cases get
their own wording: a request that never reached the server, which usually
means the phone is offline, and a 401, which almost always means the key is
wrong or missing. The generic message from TMDB for a bad key does not tell a
developer anything useful.

### React Query for server data

Anything that comes from TMDB is handled by React Query. It gives caching,
loading and error flags, retries, and paging without writing that logic again
on every screen.

Retries are switched off for any response in the 400 range. A bad key or a
movie that does not exist will never succeed on a second attempt, so retrying
only delays the error the user needs to see.

Cache keys are collected in one file, src/features/movies/queryKeys.ts, so
they cannot drift apart across hooks.

### Zustand for chosen seats

Seat selection is not server data, it is a choice the user is making, so it
does not belong in React Query. It lives in a small Zustand store instead.
Keeping it in a store rather than in screen state means the selection survives
moving back and forward between screens.

This is the only piece of global client state in the app. Everything else is
either server data or local to one screen.

### react-native-youtube-iframe for the trailer

TMDB returns YouTube video keys rather than playable video files, so a normal
video player cannot be used. This package wraps the YouTube player and gives
the two things the brief needs: a way to ask the video to play, and a callback
that reports when the video has ended so the screen can close itself.

### react-native-svg for the icons and seats

All the icons and the seat shapes are vectors, so they are drawn with
react-native-svg. The Metro config also registers react-native-svg-transformer
so that .svg files can be imported straight as components when needed.

### react-native-dotenv for the key

The API key is read from a .env file that git ignores. This package needs no
native setup at all, which keeps the project easy to clone and run. A
committed .env.example records which variables are needed.

## Folder structure

The project is organised by feature, not by file type.

```
src/
  assets/
  components/
  constants/
  features/
    movies/
      api/
      components/
      hooks/
      screens/
      queryKeys.ts
    booking/
      components/
      data/
      screens/
      types.ts
  navigation/
  services/
  store/
  theme/
  types/
  utils/
```

Grouping by type, with every screen in one screens folder and every hook in
one hooks folder, means that reading one feature involves opening four
distant folders. Grouping by feature keeps everything for the movie list in
one place.

Anything shared by more than one feature moves up a level. The pill button,
the loading and error views, and the icons sit in src/components because both
features use them. The theme, the API client, and the navigator are shared in
the same way.

## Theme

The colours, fonts, radii, and gradients are taken from the Figma file rather
than guessed. They live in src/theme.

The colour file separates raw swatches from their meaning. The palette holds
values such as navy and blue. The colors object maps them to roles such as
text.primary and seat.vip. Screens only ever use a role, so no screen has a
hex value written into it, and changing a colour is a single edit.

Font styles are exact values read off the design, including line heights. The
design uses only two Poppins weights, Regular and Medium, and only a few
sizes. A few values are marked in the code as derived, which means the design
did not specify them and they are a considered guess. That includes the
spacing scale, since the Figma file has no spacing tokens at all.

Genre colours are a fixed local list. TMDB returns only an id and a name for a
genre and no colour, so a helper picks a colour by position and cycles through
the palette.

## Navigation

There is one root stack that holds a bottom tab navigator and the pages that
open over it.

```
Root stack
  Tabs
    Dashboard (placeholder)
    Watch (movie list)
    Media Library (placeholder)
    More (placeholder)
  Search
  MovieDetail
  Trailer (full screen)
  Showtimes
  SeatSelection
```

The design shows four tabs, so all four exist, but only Watch is part of the
brief. The other three are simple placeholders so that the tab bar looks and
behaves like the design.

Route parameters are typed in one file and registered globally, so calling
navigate with a wrong route name or a missing parameter fails the type check.

## Screen notes

### Movie list

Uses a paged query. TMDB reports about 46 pages of upcoming movies, so they
are fetched as the user scrolls rather than all at once.

Pages are flattened into one array and duplicates are dropped by id, because
TMDB sometimes repeats a title across a page boundary and duplicate keys would
warn in the list.

### Movie detail

Calls the detail endpoint and the images endpoint. Rather than taking the
first backdrop it gets, the app ranks them and prefers artwork with no
language set, which means art without text baked into it, then by rating. Art
with a foreign title printed on it fights with the title the app draws on top.

Images are treated as decoration, so only the detail call decides whether the
screen shows a loading state. A slow images call never blocks the page.

### Trailer

The videos endpoint returns everything TMDB has, which for a big film can be
well over a hundred items including featurettes, clips, and behind the scenes
material, in no useful order. Taking the first result would often play the
wrong thing. The app sorts them into tiers instead: official trailers first,
then any trailer, then teasers, then anything playable, and takes the newest
inside the first tier that has something in it.

One detail worth recording. The player library sends its play command from an
effect that watches the play property. Passing a constant true fires that
effect once when the screen mounts, before the player exists, and the command
is lost. The property has to change from false to true after the player
reports that it is ready.

Fixing that got the command through to a live player, which was proved by
watching the player report that it had started after a manual tap. YouTube
still refuses to begin playing without that tap. The limits section at the end
covers what this means.

### Search

The typed text is debounced by 400 milliseconds so that a query is not sent
for every keystroke. The query is disabled while the box is empty.

Search results carry genre ids but not genre names, so the genre list is
fetched separately and kept in a lookup map. That list almost never changes,
so it is cached for the whole session.

With an empty box the screen shows a grid of genres. Rather than making one
extra request per genre for artwork, the grid reuses movies already cached
from the upcoming list and gives each genre a different movie that belongs to
it. Nineteen extra network calls for a decorative grid did not seem a fair
trade.

### Seat selection

The seat map is drawn from a layout builder. Ten rows are split into three
blocks with aisles between them, the last row is VIP, and the first two rows
are trimmed at the edges to suggest the curve of the room.

Which seats are taken comes from a fixed formula based on the row and column
rather than a random number. This keeps the map stable, so it looks the same
every time the screen opens instead of reshuffling.

The seat shape itself comes from the Figma export. A seat is a rounded back
with a small base bar below it. All the exported seat files are the same shape
in different colours, so instead of importing six near identical files the
geometry sits in one component that takes a colour. The mini map on the show
time card uses the very same component at a smaller size, so the preview can
never drift away from the real map.

Zoom changes the drawn size of the seats rather than applying a scale
transform. A transform grows the picture but not the space it takes up, which
clipped the row numbers and the outer rows and left the scroll width wrong.
Changing the size lets the layout flow properly.

Seats are small targets, so each one carries a touch margin of half the gap
between seats. This fills the dead space between seats without letting two
seats overlap each other.

## Handling missing data

Real API data is untidy, so the app plans for gaps.

Movies without backdrop art fall back to the poster, and then to a plain
placeholder block. The image helper returns nothing at all for a missing path
so that a broken image is never drawn.

Movies with no trailer leave the Watch Trailer button disabled rather than
opening an empty player.

Movies with no overview show a short line of text in place of the paragraph.

Every list has a loading state, an error state with a retry button, and an
empty state.

## Verification

Type checking and linting pass with no errors or warnings.

Every screen was run on an iPhone 17 Pro Max simulator and checked by hand,
including paging, pull to refresh, opening a movie, playing and closing a
trailer, searching, and picking seats.

The auto close behaviour of the trailer was proved rather than assumed. The
player was given a short end point so that the video finished after a few
seconds, and the screen was watched closing itself. The temporary setting was
then removed.

A recording of a full pass through the app is in the demo folder.

## Known limits and trade offs

1. The trailer does not start on its own, on either platform. This is the one
   requirement in the brief that the app does not meet. YouTube refuses an
   unattended play request inside its embed on a phone, muted or not, and the
   desktop user agent option for Android made no difference. On both an iPhone
   simulator and an Android emulator a manual tap plays the video at once, so
   the block sits on the automatic start rather than on playback. Neither was
   a physical handset. readme.txt carries the full note.

2. Show times, halls, prices, and seat availability are made up, because TMDB
   has no cinema data.

3. Proceed to pay does nothing. The brief asks for the seat screens to be user
   interface only.

4. The spacing scale is not from the design. The Figma file has no spacing
   tokens, so a standard four point scale is used and marked as derived in the
   code.

5. Genre tiles for a genre with no upcoming films borrow artwork from another
   genre. The alternative was one extra request per genre.

6. The three tabs other than Watch are placeholders.

## What would come next

1. Offline caching of the movie list, so the app opens with something to show.
2. Unit tests for the trailer picker, the seat layout builder, and the price
   total, since those hold the real logic.
3. Larger touch targets or a pinch gesture on the seat map.
4. A real booking API behind the seat screens.
