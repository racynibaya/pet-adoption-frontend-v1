import type { SparkData } from '../types'
import AdminDashboardSparkline from './AdminDashboardSparkline'

interface AdminDashboardSparkProps {
  adoptionCount: number
  spark: SparkData
}

export default function AdminDashboardSpark({ adoptionCount, spark }: AdminDashboardSparkProps) {
  return (
    <article className='bento-card bento-spark a-section' style={{ ['--i' as string]: 3 }}>
      <div className='bento-eyebrow'>
        <span className='dot' /> Adoption velocity
      </div>
      <h3 className='bento-h'>
        {adoptionCount} application{adoptionCount === 1 ? '' : 's'} in the last weeks
      </h3>
      <p className='bento-sub' style={{ marginTop: 0 }}>
        Daily submissions across all shelters.
      </p>
      <div className='bento-spark-wrap'>
        <AdminDashboardSparkline points={spark.points} max={spark.max} />
      </div>
    </article>
  )
}
