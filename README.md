# Learn new languages with flash cards

### Short description

When I was a little kid I remember my father used to learn some English regularly so he
can keep in shape. He was using a technique which later I found out was called flash
cards. The idea is pretty simple - you slice a bunch of sheets of white paper into small
rectangular pieces and write words on each side - on one side is the word you want to
learn and on the other side is the word it translates to in a language you already know.
Than you can practice the words by drawing random cards from a deck of flash cards and
trying to guess what is written on the back of the card. It appears to be a quite good
technique for learning new languages in general so I decided to create an application
that can ease the process even further.

### Current progress

There are not many things implemented so far but I've laid down the foundations - a symfony
application containing a backend api bundle using MongoDB as data storage and a frontend
bundle that serves a single-page application built upon backbone.js.

I am looking forward to upgrading symfony to the latest available version (3.2 at the moment of writing),
reorganizing the bundles in a better way by splitting the api into many self-contained small bundles and
rewritting the frontend with angular (I've already gathered experience with backbone.js in my mo-lottery
project so it is time to learn something else).

### Possible features

I am writing down a lot of ideas in my private Trello board related to this project. Some of them are:

* users can create as many decks as they want, each deck containing a set of cards

* users can start learning a deck by drawing cards in a random order

* users can get help while learning from hints and text to speech

* users can view learning statistics for each of their decks

* users can copy decks from public libraries and other users

* users can compete with each other in completing certain decks