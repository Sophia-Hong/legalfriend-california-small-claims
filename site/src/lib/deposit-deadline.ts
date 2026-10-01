// California security deposit return deadline (Civil Code §1950.5(h)(1): 21 calendar days).
// Ported unchanged from the lease app's lib/deposit/computeFields.ts. Runs only in the
// browser; nothing is sent anywhere. `now` is a parameter so the logic can be tested.

export type UrgencyLevel = "safe" | "approaching" | "urgent" | "overdue"

export interface DeadlineResult {
  deadlineDate: Date
  daysLeft: number
  urgency: UrgencyLevel
}

const DAY_MS = 1000 * 60 * 60 * 24

/** Parses an <input type="date"> value (YYYY-MM-DD) as local midnight, like the original. */
export function parseMoveOutDate(value: string): Date {
  return new Date(value + "T00:00:00")
}

export function getDeadlineDate(moveOutDate: Date): Date {
  const deadline = new Date(moveOutDate)
  deadline.setDate(deadline.getDate() + 21)
  return deadline
}

export function getDaysUntilDeadline(moveOutDate: Date, now: Date = new Date()): number {
  const deadline = getDeadlineDate(moveOutDate)
  const diff = deadline.getTime() - now.getTime()
  return Math.ceil(diff / DAY_MS)
}

export function getUrgencyLevel(daysLeft: number): UrgencyLevel {
  if (daysLeft < 0) return "overdue"
  if (daysLeft <= 3) return "urgent"
  if (daysLeft <= 7) return "approaching"
  return "safe"
}

export function computeDeadline(moveOutDate: Date, now: Date = new Date()): DeadlineResult {
  const deadlineDate = getDeadlineDate(moveOutDate)
  const daysLeft = getDaysUntilDeadline(moveOutDate, now)
  return { deadlineDate, daysLeft, urgency: getUrgencyLevel(daysLeft) }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** Result copy, verbatim from the lease app's DeadlineCalculator. */
export function urgencyMessage(result: DeadlineResult): { title: string; description: string } {
  const { daysLeft } = result
  switch (result.urgency) {
    case "overdue":
      return {
        title: "Your landlord has violated California law.",
        description: `The 21-day deadline passed ${Math.abs(daysLeft)} days ago. Under CA Civil Code §1950.5(h)(1), your landlord was required to return your deposit or provide an itemized statement. You may be entitled to up to 2x your deposit in damages under §1950.5(m).`,
      }
    case "urgent":
      return {
        title: `Only ${daysLeft} days left.`,
        description:
          "Your landlord's deadline is approaching fast. If they don't return your deposit or provide an itemized statement by the deadline, they may be in violation of CA Civil Code §1950.5.",
      }
    case "approaching":
      return {
        title: `${daysLeft} days remaining.`,
        description: "Your landlord still has time, but the deadline is approaching. Start preparing your documentation now.",
      }
    case "safe":
      return {
        title: `${daysLeft} days remaining.`,
        description:
          "Your landlord has time to return your deposit. Use this time to document your move-out condition and review your rights.",
      }
  }
}
