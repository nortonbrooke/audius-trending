import styles from "./Toggle.module.css"

export function Toggle({
  label,
  onChange,
}: {
  label: string
  onChange: (on: boolean) => void
}) {
  return (
    <div className={styles.toggle}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={(e) => {
            onChange(e.target.checked === true)
          }}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}
