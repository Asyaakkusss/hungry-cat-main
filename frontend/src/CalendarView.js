// src/components/CalendarView.js
import React from 'react';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// initializes all to 0
function CalendarView({ open, onClose, username, totalStudyTime, usernameArray }) {
    const [studyHours, setStudyHours] = useState({ today: 0, week: 0, month: 0, year: 0 });

    const calculateStudyHours = () => {
        // Assuming totalStudyTime[userIndex] is in minutes
        const userIndex = usernameArray.indexOf(username);
        if (userIndex !== -1) {
            const minutes = totalStudyTime[userIndex];
            const hours = Math.floor(minutes / 60);
            const weekly = Math.floor(minutes / (60*24));
            const monthly = Math.floor(minutes/  (60*24*30));
            const yearly = Math.floor(minutes / (60*24*365));

            // sets the hours for daily, weekly, monthly, yearly
            setStudyHours({
                today: hours,
                week: weekly, 
                month: monthly,
                year: yearly
            });
        }
    };

    useEffect(() => {
        // resets the study hours based on the date --> resets the hours for today
        const resetDailyStudyHours = () => {
            const currentDate = new Date();
            if (currentDate.getHours() === 0 && currentDate.getMinutes() === 0) {
                setStudyHours(prevState => ({ ...prevState, today: 0 }));
            }
        };

        const intervalId = setInterval(resetDailyStudyHours, 60000);

        // calculates the study hours
        calculateStudyHours();

        return () => clearInterval(intervalId);
    }, [open, username, totalStudyTime, usernameArray]);

    const today = new Date().toLocaleDateString();

    // creates Dialog for Calendar
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Study Calendar for {username}</DialogTitle>
            <DialogContent>
                <Box>
                    {/* Display for Date, Week, Month, Year */}
                    <p>Today's Date: {today}</p>
                    <p>Study Hours Today: {studyHours.today}</p>
                    <p>Study Hours This Week: {studyHours.week}</p>
                    <p>Study Hours This Month: {studyHours.month}</p>
                    <p>Study Hours This Year: {studyHours.year}</p>
                </Box>
            </DialogContent>
            <DialogActions>
                {/* Closes */}
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CalendarView;