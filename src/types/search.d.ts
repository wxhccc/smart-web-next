declare namespace Search {
  interface ListParam extends TimeRange {
    current?: number
    size?: number
  }

  interface TimeRange {
    dateRange?: [string, string]
    startTime?: string
    endTime?: string
  }
}
