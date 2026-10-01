// Run: npm test   (node --experimental-strip-types --test)
// Smoke tests for the /deposit-dispute deadline calculator logic.
import { test } from "node:test"
import assert from "node:assert/strict"
import {
  computeDeadline,
  formatDate,
  getDeadlineDate,
  parseMoveOutDate,
  urgencyMessage,
} from "../src/lib/deposit-deadline.ts"

// "Now" is 10:00 local time on 2026-10-01 in every case.
const NOW = new Date(2026, 9, 1, 10, 0, 0)
const run = (moveOut: string) => computeDeadline(parseMoveOutDate(moveOut), NOW)

test("deadline is 21 calendar days after move-out, across month and year ends", () => {
  assert.equal(formatDate(getDeadlineDate(parseMoveOutDate("2026-09-01"))), "Tuesday, September 22, 2026")
  assert.equal(formatDate(getDeadlineDate(parseMoveOutDate("2026-12-15"))), "Tuesday, January 5, 2027")
  // Crosses the US daylight-saving change on 2026-11-01; stays on local midnight.
  const dst = getDeadlineDate(parseMoveOutDate("2026-10-20"))
  assert.equal(formatDate(dst), "Tuesday, November 10, 2026")
  assert.equal(dst.getHours(), 0)
})

test("overdue", () => {
  const r = run("2026-09-01")
  assert.equal(r.urgency, "overdue")
  assert.equal(r.daysLeft, -9)
  assert.equal(urgencyMessage(r).title, "Your landlord has violated California law.")
  assert.match(urgencyMessage(r).description, /^The 21-day deadline passed 9 days ago\./)
})

test("deadline day reads as urgent with 0 days left (same as the original)", () => {
  const r = run("2026-09-10")
  assert.equal(r.urgency, "urgent")
  assert.equal(urgencyMessage(r).title, "Only 0 days left.")
})

test("urgent, approaching, safe thresholds", () => {
  assert.deepEqual([run("2026-09-12").urgency, run("2026-09-12").daysLeft], ["urgent", 2])
  assert.deepEqual([run("2026-09-15").urgency, run("2026-09-15").daysLeft], ["approaching", 5])
  assert.deepEqual([run("2026-09-17").urgency, run("2026-09-17").daysLeft], ["approaching", 7])
  assert.deepEqual([run("2026-09-18").urgency, run("2026-09-18").daysLeft], ["safe", 8])
  assert.equal(urgencyMessage(run("2026-09-25")).title, "15 days remaining.")
})
