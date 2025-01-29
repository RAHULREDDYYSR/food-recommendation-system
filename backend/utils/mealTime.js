export function getMealTime() {
    const currentHour = new Date().getHours();
    
    // Expanded time ranges with buffer periods
    if (currentHour >= 5 && currentHour < 11) {      // 5 AM - 10:59 AM
      return { 
        meal: 'breakfast',
        message: 'Good morning! Time for breakfast 🥞',
        currentHour
      };
    } else if (currentHour >= 11 && currentHour < 16) {  // 11 AM - 3:59 PM
      return {
        meal: 'lunch',
        message: 'Lunch time! 🍔',
        currentHour
      };
    } else if (currentHour >= 16 && currentHour < 18) {  // 4 PM - 5:59 PM
      return {
        meal: 'snack',
        message: 'Snack break! 🍎',
        currentHour
      };
    } else if (currentHour >= 18 && currentHour < 23) {  // 6 PM - 10:59 PM
      return {
        meal: 'dinner',
        message: 'Dinner time! 🍝',
        currentHour
      };
    } else {                                             // 11 PM - 4:59 AM
      return {
        meal: 'late-night',
        message: 'Late night cravings? 🌙',
        currentHour
      };
    }
  }
  
  