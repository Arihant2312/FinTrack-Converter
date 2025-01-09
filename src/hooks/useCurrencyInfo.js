import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        // Fetch currency data when the 'currency' changes
        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(
                    `https://v6.exchangerate-api.com/v6/27db16164e6d36c5e1b0e981/latest/${currency}`
                );
                const result = await response.json();
                if (result.result === "success") {
                    // Set the conversion rates data
                    setData(result.conversion_rates);
                } else {
                    // Handle errors if needed
                    console.error("Error fetching currency data");
                }
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchCurrencyData();
    }, [currency]); // Re-fetch when the 'currency' changes

    // Log data whenever it changes
    useEffect(() => {
        console.log(data);
    }, [data]); // Logs after 'data' is updated

    return data;
}

export default useCurrencyInfo;
