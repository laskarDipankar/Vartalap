export async function swDev() {
    console.log("service worker")
    // let swUrl = `${process.env.PUBLIC_URL}./sw.ts`;
    try {
      
      let response = await navigator.serviceWorker.register("/sw.js")
        console.log("service worker registered");
        console.warn(response);
    } catch (error) {
      console.log(error,"no sw")
    }
  
  }
  