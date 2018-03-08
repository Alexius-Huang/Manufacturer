export default function DateResolver(options = {
  targetTime: null,
  startTime: null,
  endTime: null,
  after: null,
  before: null,
  locale: 'en-US',
  format: 'mm/dd/yyyy',
  type: 'CURRENT' // 'CURRENT', 'RANGED'
}) {
  return new Date();
}
