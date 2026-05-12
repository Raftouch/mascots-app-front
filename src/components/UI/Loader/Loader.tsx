import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`${styles.loader} w-[100px] h-[100px] rounded-full border-4 border-dashed border-gray-800`}
      ></div>
    </div>
  );
}
