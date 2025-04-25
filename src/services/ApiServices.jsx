const API_BASE_URL = 'https://ads.planetmedia.app/api';

export const postAdvertisement = async (data, apiKey, jwt) => {
  try {
    const response = await fetch(`${API_BASE_URL}/advertisements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to post advertisement');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};