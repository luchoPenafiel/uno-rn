# UNO Calculator

This is a React Native project/

## DEMO

https://user-images.githubusercontent.com/25674406/150867745-3020abb0-71f3-4b11-a246-8289f7edbda1.mp4


## Getting Started

- Clone repository
- Run `yarn install`

## Tech Stack

- React Native
- Styled Components

## Folder Structure

    .
    ├── android              # All the specific native code for Android.
    ├── ios                  # All the specific native code for iOS.
    ├── src
        ├── assets           # All public files.
        ├── components       # The stateless reusable components.
        ├── constants        # Used to store colours, common types and fonts.
        ├── contexts         # For React Context files. I usually prefer the Context API instead of Redux or some more convoluted solutions.
        ├── mooks            # Fake data.
        ├── routes           # The routes configuration files.
        ├── screens          # The views for the project. Use one per url to keep the code tidy.
        ├── types            # Models and types of data.
    └── README.md            # The first page the user will see when visiting the repo.
