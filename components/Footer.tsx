import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  const currentyear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="flex-center p-5">
        {currentyear} {APP_NAME}. All Rights Reserved
      </div>
    </footer>
  );
}
