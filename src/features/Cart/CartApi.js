export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/cart?user='+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    const url = 'http://localhost:8080/cart/'+update.id;
    console.log('URL:', url);
    console.log('Update Object:', update);
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);
      resolve({ data });
    } catch (error) {
      console.error('Failed to update cart:', error);
      reject(error);
    }
  });
}



export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        // If the response is not ok, reject the promise with the status text
        return reject(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Assuming server will return relevant information of the item deleted
      resolve({ data: { id: itemId, ...data } });
    } catch (error) {
      // Catching any other errors and rejecting the promise
      reject(`Network error: ${error.message}`);
    }
  });
}