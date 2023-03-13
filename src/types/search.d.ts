declare namespace Search {
  export interface ListParam extends TimeRange {
    current?: number
    size?: number
    searchCount?: boolean
  }

  export interface TimeRange {
    startTime?: string
    endTime?: string
  }
}
