import Image from "next/image";
import loader from "@/assets/loader.gif";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image src={loader} alt="loading..." width={100} height={100} />
    </div>
  );
}
