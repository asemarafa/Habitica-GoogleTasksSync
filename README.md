# Google Tasks -> Habitica One-way Sync

This is a fork of [zemmyang/Habitica-GoogleTasksSync](https://github.com/zemmyang/Habitica-GoogleTasksSync).

The original maintainer has stopped maintaining the project, so I've forked it for my own use and to make some changes.

I am not sure if I will be able to maintain this project for others, so any pull requests/issues may not be addressed.

## Original readme follows

Do you like Google Tasks to keep everything in place but also want to level up your character in Habitica? This tool copies all of your Google Tasks to Habitica and checks if any of the GTasks are updated/marked as done and marks the corresponding Habitica todo accordingly.

Limited to 100 tasks per tasklist theoretically, but you'll hit the Google Apps Script runtime limit at that point. Best to limit it at around 50 tasks total (including completed tasks).

## Usage

### For Non-Developers

1. **Download the `*.js` Files**:
    - Download the files from the `src` directory of this repository.

2. **Rename the Files**:
    - Rename the downloaded `.js` files to `.gs` files.

3. **Create a Google Apps Script Project**:
    - Go to [Google Apps Script](https://script.google.com/).
    - Create a new project.

4. **Upload the Files**:
    - Upload, or copy and paste, all the renamed `.gs` files into your Google Apps Script project.

5. **Enable the "Tasks API" Service**:
    - From within the project, select the "+" icon next to "Services".
    - Scroll down and add the "Tasks API" service.

    <img src="screenshots/gapps_services.png" width="500" />

6. **Configure Script Properties**:
    - Go to "Project Settings" (gear icon at the right) and populate the "Script Properties" as follows:
      * `habitica_apikey`, `habitica_userid`, and `habitica_apiurl` are self-explanatory.
      * `delay_in_seconds` forces the script to take a break between requests, so that the Habitica API won't kick you out for making too many requests at a time.
      * `gtasks_maxresults` limits the amount of tasks you can get per tasklist in GTasks. You can theoretically increase this number.
      * `verbose` makes the log more chatty. Not implemented.

    <img src="screenshots/script_properties.png" width="500" />

7. **Add a Trigger**:
    - Add a trigger to run `main` on a timer, e.g., every 5 minutes.
    - From within the project, select the clock icon on the left then the "+ Add Trigger" button on the bottom right.
      * Choose which function to run: "main"
      * Choose which deployment should run: "Head" (the only option)
      * Select event source: "Time-driven"
      * Select type of time-based trigger: "Minutes timer" (adjust as desired)
      * Select minute interval: "Every 5 minutes" (adjust as desired)

    <img src="screenshots/trigger.png" width="500" />

8. **Enable Google Apps Script API**:
    - Go to [Google Apps Script User Settings](https://script.google.com/home/usersettings).
    - Ensure the Google Apps Script API is enabled.

### For Developers

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/Habitica-GoogleTasksSync.git
    cd Habitica-GoogleTasksSync
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Enable Google Apps Script API**:
    - Go to [Google Apps Script User Settings](https://script.google.com/home/usersettings).
    - Ensure the Google Apps Script API is enabled.

4. **Authenticate Clasp**:
    ```bash
    npx clasp login
    ```

5. **Create or Link Your Google Apps Script Project**:
    - Create a `.clasp.json` file with your project details:
      ```json
      {
        "scriptId": "your_script_id",
        "rootDir": "src"
      }
      ```

6. **Push the Code to Google Apps Script**:
    ```bash
    npx clasp push
    ```

## Limitations

* Does not handle repeating tasks
* Each subtask is imported as a separate task
* The Habitica side does end up looking quite cluttered later on

## Future planned features

* Support for repeated tasks
* Use the Task List name as a Habitica tag
* Two-way sync <- serious question, does anyone want this? lmk
* Trigger-based updating on GTasks. That's on Google's side, not me :)

## Changelog
  
v2.0.0 - Overhauled the code completely.  
v1.2.0 - Checklist and tags support.  
v1.1.0 - Works in longer testing, now supports up to 100 tasks per task list.    
v1.0.0-alpha - Works in testing but not completely tested yet
