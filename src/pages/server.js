import { ref } from "vue";
export function serverSetup() {
  // const serverData = ref("http://192.168.1.145/riva4/");
  const serverData = ref("https://riva.negotiatetrade.org/riva_api/");
  return {
    serverData,
  };
}
