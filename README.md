# LexApp

### Local Government at your fingertips.

LexApp is a mobile application that connects to Legistar in order to make civic data more accessible on mobile platforms.

## Getting Started

The mobile application is built with the Ionic Framework.

### Prerequisites

Install NodeJS

Install Ionic and Cordova:
```
npm install -g ionic cordova
```

### Running

The config.xml and environment.ts is missing on purpose as both contain sensitive keys.

For the config.xml, copy the config.example.xml to a new config.xml.

The environment.ts file goes in the /src folder and contains the info for Firebase.

The file should look like:
```
export const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
 };

export const gaKey = "";
```

Use ionic to run in the browser

```
ionic serve
```

The site will be available at http://localhost:8100

Note: There may be a CORS issue. I fixed this by installing a Chrome extension to turn off CORS for localhost, but you may also opt to make a proxy.


### Building for iOS or Android

Refer to the Ionic Framework [Documentation](https://ionicframework.com/getting-started/)


## Authors

* **Drake Witt** - *Maintainer* - [DrakeWitt](https://github.com/DrakeWitt)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to everyone at Bryan Station that helped us.
* Thanks to the wonderful people at LFUCG
