import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "./server.js";
import { LocalStorage } from "quasar";
import axios from "axios";

export function useAuth() {
  const router = useRouter();
  const hashkey = ref(LocalStorage.getItem("myKey"));
  const { serverData } = serverSetup();
  const checkHashkey = async () => {
    if (!hashkey.value) {
      localStorage.clear();
      router.push("/");
      return;
    }

    const url = serverData.value + "cc/checkAccess.php";
    const dataSent = {
      hashKey: hashkey.value,
    };

    const res = await axios.post(url, JSON.stringify(dataSent));
    if (res.data == "logout") {
      router.push("/");
    }
  };

  onMounted(() => {
    checkHashkey();
  });

  return {
    checkHashkey,
  };
}
