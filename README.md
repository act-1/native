<h1 align="center">
    <img width="266" src="https://res.cloudinary.com/act1/image/upload/v1612944972/meta/logo_gf7ecz.svg" alt="Act1" />
</h3>
<p align="center">
 <a href="#"><img src="https://img.shields.io/github/contributors/act-1/native" /></a>
 <a href="https://github.com/act-1/native/issues?q=is%3Aissue+is%3Aopen+label%3A%22up+for+grabs%22"><img src="https://img.shields.io/github/issues/guytepper/1km.co.il/up%20for%20grabs?color=%57ce22&label=up%20for%20grabs" alt="Up for grabs issues" /></a>
<a href="https://discord.gg/3jGSYeBuHj"><img src="https://img.shields.io/discord/761593399391420467?logo=discord" alt="Chat on Discord"></a>
</p>
<hr/>

## Welcome to Act1!

Act1 strives to be the home for social change, encouraging citizens of the world to act for the struggles and values that they believe in.

Wanna join us? Take a look at the [up for grabs](https://github.com/act-1/native/labels/up%20for%20grabs) list or [join our discord server](https://discord.gg/3jGSYeBuHj)!

### Introduction

The project is written using React Native.  

> If you don’t have experience with React Native but still would like to help, we have other projects planned in the upcoming months with different technologies.  
[Fill the form](https://act-1.typeform.com/to/FSMtVVC8) and we’ll let you know once development has begun!


The main libraries we use:

- [React Native Firebase](https://rnfirebase.io/) helps us interact with Firebase.
- [MobX](https://mobx.js.org/README.html) ensures we have a single source of truth.
- [React Navigation](https://reactnavigation.org/docs/getting-started) will take us to the right place.
- [restyle](https://github.com/Shopify/restyle) provides a theming toolkit and a supercharged `Box` (View) & `Text` components.

### Installation

- Fork the repo and clone to your machine.
- Run `yarn install`
- Run `cd ios && pod install`

Now you'll need to configure Firebase. 
Here you have 2 methods - the quick & dirty way, or the longer & neater method.

> Traditionally we'll use the 2nd method, but since we still try to figure out the best way to speed up the project installation for new developers - we perfer newcomers to use the 1st method.

#### 1. Quick & Dirty - Get the development credentials from the maintainers
Join our <a href="https://discord.gg/3jGSYeBuHj">discord server</a>, introduce yourself (important!) and one of the maintainers will reach out to you with the firebase development credentials.

#### 2. Longer & Neater - Set up your own firebase project
- Create a firebase project and set it up on iOS & Android according to [React Native Firebase](https://rnfirebase.io/#2-android-setup) docs
- Clone our [cloud functions](https://github.com/act-1/cloud-functions) repo, install it and run the emulator (more info at the repo)
- You'll need to add either Google / Facebook as sign up providers. Please look up in the [React Native Firebase Auth](https://rnfirebase.io/auth/social-auth) docs for instructions.

### License
The source code is released under the [AGPL-3.0 license](https://github.com/act-1/native/blob/main/LICENSE).  

The project assets - the user interface, app branding, images, illustations, icons and fonts are outside the scope of the license and requires a permission to use.
