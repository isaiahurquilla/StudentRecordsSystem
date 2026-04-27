# Student Records System

This is a self-built student records app I created to manage student information, track academic status, and show alerts and analytics based on student data.

The app is built with React Native and Expo, and it uses local storage to keep student records saved between sessions.

## Features

- Add student records
- Edit student records
- Delete student records
- View all students
- Search students by name, ID, or major
- Sort students by:
  - Name
  - GPA
  - Graduation Year
- Filter students by:
  - Risk level
  - Registration hold
- Automatically calculate:
  - Academic standing
  - Enrollment load
  - Registration hold
  - Risk level
- View alerts for:
  - Registration holds
  - Academic risk
  - Financial warnings
  - High-risk students
- View analytics such as:
  - Total students
  - Average GPA
  - Highest performing student
  - Standing distribution
  - Students with holds
  - Grouped data by major
- Load sample data
- Clear all data
- Save student data locally

## Tech Stack

- React Native
- Expo
- React Navigation
- AsyncStorage
- Context API
- useReducer

## Installation

Install dependencies with:

npm install