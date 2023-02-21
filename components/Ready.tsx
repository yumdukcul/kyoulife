import styles from '@/styles/Ready.module.css'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'

export default function Ready() {
    return (
        <div className={styles.ready}>
            <WrenchScrewdriverIcon />
            준비 중인 페이지입니다.
        </div>
    )
}
