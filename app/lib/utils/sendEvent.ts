export const sendGTMEvent = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);

  // Если все еще используете gtag
  if (window.gtag) {
    window.gtag("event", data.event, {
      page_location: data.page_location,
      page_path: data.page_path,
      page_title: data.page_title,
    });
  }
};
