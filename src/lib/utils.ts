/**
 * Shared presentational utilities.
 */

/** Conditional class-name joiner. Filters out falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
