CineSeat
========

A React Native app that lists upcoming movies from The Movie Database (TMDB)
and lets you browse a movie, watch its trailer, search the catalogue, and pick
seats for a show.

Built for the Tentwenty mobile assessment.


WHAT THE APP DOES
=================

1. Movie list
   Shows all upcoming movies as full width cards with the poster art and the
   title. The list loads more pages as you scroll. Pull down to refresh.

2. Movie detail
   Opens when you tap a movie. Shows a large hero image, the release date, the
   genres, and the overview. Two buttons sit on the hero: Get Tickets and
   Watch Trailer.

3. Trailer player
   Opens full screen over the detail page. The player closes itself when the
   trailer finishes. You can also close it any time with the Done button.

4. Search
   Opens from the search icon on the movie list. With an empty box it shows a
   grid of genres. Once you type, it shows matching movies with the poster,
   the title, and the first genre. Results load more pages as you scroll.

5. Seat selection
   Get Tickets opens a screen where you pick a date and a show time. Select
   Seats then opens the seat map, where you can tap seats, zoom in and out,
   remove a chosen seat, and see the total price update.


REQUIREMENTS
============

Node 20.19.4 or newer. Node 22.13 or 24.3 are also fine.
Note that odd numbered Node releases such as 23 are not supported by React
Native 0.86 and can cause confusing build errors.

Xcode with an iOS simulator, for the iOS build.
Ruby with Bundler, for the iOS native dependencies. The Gemfile pins the
CocoaPods version that this project builds with.
Android Studio with a JDK, for the Android build.

The app runs on React Native 0.86.2 and React 19.2.3, with the New
Architecture turned on.


SETUP
=====

1. Install the packages.

   npm install

2. Create your environment file.

   cp .env.example .env

   Then open .env and paste your own TMDB key into it.
   The file looks like this:

   TMDB_API_KEY=your_key_here

   The .env file is ignored by git on purpose, so your key never gets
   committed. See the next section for how to get a key.

3. Copy the fonts into the native projects.

   npx react-native-asset

   The app uses Poppins. The font files already live in src/assets/fonts, and
   this command registers them with iOS and Android.

4. Install the Ruby gems, then the iOS pods.

   bundle install
   cd ios && bundle exec pod install && cd ..

   The project pins its own version of CocoaPods in the Gemfile, so run
   bundle install first and then call pod through bundle exec. That way
   everyone builds with the same CocoaPods version instead of whichever one
   happens to be installed on the machine. Skip this step if you are only
   running on Android.

5. Start the bundler.

   npm start

6. Run the app.

   npm run ios

   or

   npm run android


HOW TO GET A TMDB KEY
=====================

The key is free and you get it right away.

1. Create an account at https://www.themoviedb.org/signup
2. Verify your email address. The API page stays locked until you do.
3. Go to https://www.themoviedb.org/settings/api
4. Choose the Developer option, which is the free one.
5. Fill in the short form. For an assessment project you can use Personal or
   Education as the type of use, and your repository address as the
   application address.
6. Copy the value labelled API Key (v3 auth). It is 32 characters long.

Do not use the longer token labelled API Read Access Token (v4 auth). That one
is a bearer token and it will not work here, because this app sends the key as
a query parameter in the v3 style.

You can check that your key works with this command:

   curl "https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_KEY"


SCRIPTS
=======

   npm start          Start the Metro bundler
   npm run ios        Build and run on the iOS simulator
   npm run android    Build and run on an Android emulator or device
   npm run lint       Run ESLint
   npm test           Run the Jest tests
   npx tsc --noEmit   Type check the whole project


DEMO
====

The demo folder holds a screen recording that walks through the whole app,
covering the movie list, a movie detail page, the trailer player, search, and
picking seats.

   demo/


PROJECT LAYOUT
==============

   App.tsx                  Sets up the providers and the navigator
   demo/                    Screen recording of the app
   src/
     assets/                Poppins fonts and the seat icons
     components/            Shared pieces used by more than one feature
     constants/             API address, image sizes, image helpers
     features/
       movies/              Movie list, detail, trailer, and search
       booking/             Show times and the seat map
     navigation/            Navigator setup and route types
     services/              Axios client, endpoints, React Query client
     store/                 Zustand store for the chosen seats
     theme/                 Colours, fonts, spacing taken from the design
     types/                 Shared TypeScript types
     utils/                 Small helpers such as date formatting

Each feature folder holds its own api, hooks, components, and screens, so a
feature can be read on its own without jumping around the project.

There is a longer explanation of the structure and the technical choices in
DESIGN.md.


THINGS TO KNOW
==============

1. The trailer does not start by itself.

   This is the one thing in the brief that the app does not do. It affects
   both platforms.

   TMDB only gives back YouTube video keys, so the trailer has to play inside
   a YouTube embed, and YouTube refuses a play request that nobody asked for
   on a phone. Three ways around it were tried and none of them worked.
   Starting the video muted, which is the usual trick on the web, is refused
   as well. Muting the player first and only then asking it to play is also
   refused. The player carries the forceAndroidAutoplay option, which makes
   the embed think it is running in a desktop browser, and that changed
   nothing either.

   Checked on an iPhone simulator and on an Android emulator. On both of them
   the video plays straight away the moment the play button is tapped, so the
   video itself is fine and it is only the unprompted start that is refused. A
   physical handset was not tested, so it may behave differently there.

   The player therefore opens full screen with the trailer loaded and ready,
   and the viewer taps once to start it. The rest of that part of the brief
   works as asked. The player is full screen, it closes itself as soon as the
   trailer ends, and the Done button closes it early.

2. The seat screens are user interface only.

   This matches the brief. Nothing is booked and no payment happens. Proceed
   to pay does not do anything.

3. Show times and seat availability are made up.

   TMDB has no cinema data, so the dates, halls, prices, and the pattern of
   taken seats are generated in the app. The seat pattern comes from a fixed
   formula rather than a random number, so the map looks the same every time
   you open it instead of changing on every screen draw.

4. If pod install fails with an encoding error.

   CocoaPods can fail with a message about Unicode normalization when the
   shell has no UTF 8 locale. If that happens, run it like this:

   LANG=en_US.UTF-8 bundle exec pod install

5. If Metro cannot find the module @env.

   Clear the cache and start again:

   npm start -- --reset-cache


VERIFICATION
============

Type checking and linting both pass with no errors.

   npx tsc --noEmit
   npm run lint

Every screen was run and checked on an iPhone 17 Pro Max simulator, including
paging through the movie list, opening a movie, playing and closing a trailer,
searching the catalogue, and choosing seats and watching the total price
change.
