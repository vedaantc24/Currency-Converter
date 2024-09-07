const apiKey = 'cur_live_W1p54zPB2RpxDVj8pEuzgdMB9EWNdS1FXtwIqBND'
const baseUrl = "https://api.currencyapi.com/v3/latest"

async function fetchExchangeRates(baseCurrency, targetCurrency) {
    try {
      
      const url = `${baseUrl}?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${targetCurrency}`;
  
      
      const response = await fetch(url);
      
    
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}. Details: ${errorDetails}`);
      }
  
      
      const data = await response.json();
      
      
      const exchangeRate = data.data[targetCurrency].value;
      
    
      console.log(`Exchange rate from ${baseCurrency} to ${targetCurrency}: ${exchangeRate}`);
      
      
      return exchangeRate;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  }

  fetchExchangeRates('USD', 'INR')

  document.getElementById('currency-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const baseCurrency = document.getElementById('base-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const exchangeRate = await fetchExchangeRates(baseCurrency, targetCurrency);
    if (!exchangeRate) {
        alert('Failed to fetch exchange rate.');
        return;
    }

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    
    document.getElementById('conversion-result').innerText = `${amount} ${baseCurrency} is equal to ${convertedAmount} ${targetCurrency}`;
    
    const tableBody = document.getElementById('conversion-table-body');
    // tableBody.innerHTML = `
    //     <tr>
    //         <td>${baseCurrency}</td>
    //         <td>${baseCurrency}</td>
    //         <td>${amount}</td>
    //     </tr>
    //     <tr>
    //         <td>${targetCurrency}</td>
    //         <td>${targetCurrency}</td>
    //         <td>${convertedAmount}</td>
    //     </tr>
    // `;
});
