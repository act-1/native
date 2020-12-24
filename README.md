<h1 align="center">
  Act1
</h3>
<p align="center">
 <a href="#"><img src="https://img.shields.io/github/contributors/act-1/native" /></a>
 <a href="https://github.com/act-1/native/issues?q=is%3Aissue+is%3Aopen+label%3A%22up+for+grabs%22"><img src="https://img.shields.io/github/issues/guytepper/1km.co.il/up%20for%20grabs?color=%57ce22&label=up%20for%20grabs" alt="Up for grabs issues" /></a>
<a href="https://discord.gg/3jGSYeBuHj"><img src="https://img.shields.io/discord/761593399391420467?logo=discord" alt="Chat on Discord"></a>
</p>
<hr/>


## Welcome to Act1!  
Here we write code to bring back the power to the people.  
Wanna join us? Take a look over at our [up for grabs](https://github.com/act-1/native/labels/up%20for%20grabs) issue list and [visit our discord](https://discord.gg/3jGSYeBuHj)!

### Introduction
The project is written using React Native.  
The main libraries we use:
- [React Native Firebase](https://rnfirebase.io/) helps us interact with Firebase.
- [MobX](https://mobx.js.org/README.html) ensures we have a single source of truth.
- [React Navigation](https://reactnavigation.org/docs/getting-started) will take us to the right place.
- [restyle](https://github.com/Shopify/restyle) provides a theming toolkit and a supercharged `Box` (View) & `Text` components.

### Installation
- Fork the repo and clone to your machine.
- Run `yarn install`
- Run `cd ios && pod install`

Now let's configure Firebase:

- Create a firebase project and setup it on iOS & Android according to [React Native Firebase](https://rnfirebase.io/#2-android-setup) docs
- Clone our [cloud functions](https://github.com/act-1/cloud-functions) repo, install it and run the emulator (more info at the repo)

