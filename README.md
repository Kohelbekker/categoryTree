# Category Tree

This is my implementation of category tree, with infinite depth using React JS.

This app loads data in JSON format from Firebase Realtime database.

Here is list of features:

- Ability to **save data** to the Firebase and **reset data** (app will fetch latest data from Firebase and replace all unsaved changes).
- Error handling - if there is error during the connection to the DB - app will show notification with details to the user. In this case app will use default data and will still be running.
- Styling.
- App support multiple trees.
- Some unit tests.
