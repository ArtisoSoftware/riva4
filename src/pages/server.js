import { ref } from "vue";
export function serverSetup() {
  const serverData = ref("http://localhost/riva4/");
  return {
    serverData,
  };
}
