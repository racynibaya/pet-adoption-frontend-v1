import type { ReactNode } from 'react'

export interface AboutStat {
  num: string
  lab: string
}

export interface AboutValue {
  bg: string
  title: string
  desc: string
  icon: ReactNode
}

export interface AboutTimelineItem {
  yr: string
  title: string
  desc: string
}

export interface AboutTeamMember {
  name: string
  role: string
  bg: string
  svg: ReactNode
}
