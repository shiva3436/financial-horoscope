// Elements for the horoscope display
const horoscopeText = document.getElementById("horoscope-text");
const financialTip = document.getElementById("financial-tip");
const horoscopeContainer = document.getElementById("horoscope-container");
const signSelection = document.getElementById("sign-selection");
const zodiacSelect = document.getElementById("zodiac-sign");

// Function to generate and fetch the horoscope
async function generateHoroscope() {
    const selectedSign = zodiacSelect.value;

    if (!selectedSign) {
        alert("Please select your zodiac sign.");
        return;
    }

    // Show the horoscope container and hide sign selection
    signSelection.style.display = "none";
    horoscopeContainer.style.display = "flex";

    try {
        // Fetching horoscope data from Aztro API (POST request)
        const response = await fetch("https://aztro.sameerkumar.website?sign=" + selectedSign + "&day=today", {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Log the response to the console to understand the structure
        console.log("API Response: ", data);

        // Check if the description exists in the response and display it
        if (data.description) {
            horoscopeText.innerHTML = data.description;
        } else {
            horoscopeText.innerHTML = "Sorry, we couldn't fetch the horoscope for today.";
        }

        // Display financial tip based on zodiac sign
        financialTip.innerHTML = `<strong>Financial Tip:</strong> ${getFinancialTip(selectedSign)}`;

    } catch (error) {
        console.error("Error fetching horoscope:", error);
        // If API fails, show a random horoscope
        horoscopeText.innerHTML = generateRandomHoroscope(selectedSign);
        financialTip.innerHTML = `<strong>Financial Tip:</strong> ${getFinancialTip(selectedSign)}`;
    }
}

// Sample function to generate financial tips based on zodiac sign
function getFinancialTip(sign) {
    const financialTips = {
        Aries: "It's a good time to take calculated risks. Consider investing in stocks.",
        Taurus: "Be mindful of your spending. Focus on savings this month.",
        Gemini: "Diversify your investments and explore new financial opportunities.",
        Cancer: "Pay attention to your long-term financial goals. Be patient.",
        Leo: "You may receive unexpected money. Think wisely about your next move.",
        Virgo: "Focus on budgeting and tracking your expenses more closely.",
        Libra: "You might discover a new source of income. Stay open to new opportunities.",
        Scorpio: "Stay focused and disciplined in your finances. Don't let emotions sway you.",
        Sagittarius: "Think big, but be cautious. Avoid risky investments today.",
        Capricorn: "Keep a long-term view. Invest in retirement funds and secure assets.",
        Aquarius: "A day for reflection. Assess your current financial strategy.",
        Pisces: "Your intuition might guide you toward a lucrative investment opportunity."
    };
    return financialTips[sign] || "Stay mindful of your financial decisions today.";
}

// Function to generate a random horoscope message based on the zodiac sign
function generateRandomHoroscope(sign) {
    const horoscopes = {
        Aries: [
            "Today is a day to take action! You may find new financial opportunities.",
            "Expect a burst of energy. Use it to focus on your financial goals.",
            "Big decisions are ahead. Trust your instincts when it comes to money."
        ],
        Taurus: [
            "Patience is key today. Slow down and consider your financial future.",
            "Avoid unnecessary spending today. Focus on building savings.",
            "Today is a good day to assess your long-term financial health."
        ],
        Gemini: [
            "Communication will be important today. Be open to new financial advice.",
            "There may be a surprise income opportunity. Stay alert and seize it.",
            "Your curiosity will lead you to new financial ventures today."
        ],
        Cancer: [
            "Think about your security today. Long-term investments will pay off.",
            "You may feel a need for financial stability. Plan for the future.",
            "Take a moment to reflect on your financial values today."
        ],
        Leo: [
            "An unexpected opportunity may come your way. Use your leadership to take charge.",
            "Your charisma will help you in negotiations. Use it to your advantage.",
            "You may receive some good news regarding money. Celebrate wisely."
        ],
        Virgo: [
            "A careful approach to spending is needed today. Stick to your budget.",
            "Stay focused on your financial goals. Small steps will lead to big results.",
            "Avoid impulsive purchases today. Organize your finances for the future."
        ],
        Libra: [
            "New financial opportunities may present themselves. Stay open to them.",
            "Today is a good day to collaborate with others for financial success.",
            "Find balance in your finances today. Don't be swayed by impulse."
        ],
        Scorpio: [
            "Focus and discipline will be key today. Stick to your financial plan.",
            "Avoid emotional decisions when it comes to money today.",
            "Trust in your instincts, but don't be reckless with your finances."
        ],
        Sagittarius: [
            "Think big, but be cautious with your investments today.",
            "A new opportunity for growth may arise. Weigh the risks carefully.",
            "Your adventurous spirit may tempt you, but make sure to evaluate all options."
        ],
        Capricorn: [
            "Long-term thinking will benefit you today. Secure your financial future.",
            "Focus on your goals today, even if the road ahead seems long.",
            "A conservative approach to your finances will pay off in the future."
        ],
        Aquarius: [
            "Today is a day for reflection. Re-evaluate your financial strategy.",
            "Innovative ideas may come to you. Consider investing in new ventures.",
            "Stay focused on your long-term goals. Trust in your planning."
        ],
        Pisces: [
            "Your intuition will guide you toward a great financial opportunity today.",
            "Trust your gut when making money decisions today.",
            "You may feel a surge of creativity. Consider investing in new ventures."
        ]
    };

    const randomIndex = Math.floor(Math.random() * horoscopes[sign].length);
    return horoscopes[sign][randomIndex];
}

// Function to reset the app back to the zodiac sign selection screen
function resetHome() {
    signSelection.style.display = "flex";
    horoscopeContainer.style.display = "none";
    zodiacSelect.value = ""; // Reset the dropdown selection
}
