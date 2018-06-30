import { DEFAULT_LOCALE, ALLOWED_LOCALES } from '../config'

/**
 * Turn an argument into a lowercased trimmed string
 * @param  {any} arg - can be anything
 * @return {string}
 */
export function sanitize(arg) {
  if (arg) {
    return ('' + arg).toLowerCase().trim()
  }
  return ''
}

/**
 * Try to interpret given value as a valid locale.
 * If fails to do so - return empty string.
 *
 * @param  {string} locale - locale under examination
 * @return {string} -  valid locale or ''
 */
export function extractLocale(value) {
  value = sanitize(value)
  if (value && ALLOWED_LOCALES.indexOf(value) !== -1) {
    return value
  }
  return ''
}

/**
 * Try to resolve one or more gived candidate values
 * as a valid locale and return the first one
 * successfully resolved.
 * If none does resolve, return the DEFAULT_LOCALE
 *
 * Sample usage:
 *   ( assuming that
 *      ALLOWED_LOCALES === ['en', 'ru']
 *      DEFAULT_LOCALE='en' )
 *
 *    'ru' === resolveLocale('RU')
 *    'ru' === resolveLocale('ru','de')
 *    'ru' === resolveLocale('de','ru')
 *    'ru' === resolveLocale('de', 'ar', 'ru')
 *    'en' === resolveLocale('de')
 *    'en' === resolveLocale('de','ar')
 *    'en' === resolveLocale('rus')
 *    'en' === resolveLocale()
 *
 * @param  {[stringtype]} args [description]
 * @return {[type]}      [description]
 */
export function resolveLocale(...values){
  return [...values, DEFAULT_LOCALE].map(extractLocale).find(Boolean)
  // return extractLocale(locale) || extractLocale(default) || DEFAULT_LOCALE
}

/**
 * Extract localized attribute of an object:
 *  - either as `obj[locale][attr]`
 *  - or, if fails, as `obj[DEFAULT_LOCALE][attr]`
 *  - If both fail - return undefined
 *
 * @param  {object} obj - object holding desired nested attribute
 * @param  {string} attr - name of nested attribute
 * @param  {string} locale - desired locale
 * @return {any} - either the value of found nested attr, or undefined
 */
export function getI18nAttr(obj, attr, locale) {
  if (!obj) {
    return undefined
  }

  locale = resolveLocale(locale)

  const pathList = locale === DEFAULT_LOCALE ? [locale] : [locale, DEFAULT_LOCALE]

  // try to get nested attr for every path in the list until success
  for (let p of pathList) {
    let { [p]: tmp } = obj
    let { [attr]: value } = tmp || {}
    if (value !== undefined) return value
  }
}

/**
 * factory that makes a FM (FormatMessage) function
 * based on `intl` object received through props
 *
 * to get it work the host component should be
 * injected with react-intl:
 *
 * import { injectIntl } from 'react-intl'
 * ...
 * export default injectIntl(<current component>)
 *
 * then use this function to extract translation values directly:
 *
 * // somewhere inside `render`:
 * const FM = makeFM(this.props)
 * ...
 * const translatedText = FM('app.hello_world')
 */
export const makeFM = ({ intl }) => id => intl.formatMessage({ id })

export default {
  sanitize,
  extractLocale,
  resolveLocale,
  getI18nAttr,
  makeFM
}