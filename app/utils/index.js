function calculateTime(timestamp) {
  const options = {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  };

  const newDateTime = new Date(timestamp);

  return newDateTime.toLocaleTimeString('en-US', options);
}

export { calculateTime };