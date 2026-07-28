/**
 * Shared layout for generated share cards (Open Graph / Twitter).
 *
 * Rendered by satori through `next/og`, which supports a subset of CSS:
 * every element with more than one child needs an explicit `display: flex`,
 * and there is no cascade. Keep the styles inline and literal.
 */
export function OgCard({
  eyebrow,
  meta,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string
  meta: string
  title: string
  subtitle: string
  footer: string
}) {
  const titleSize = title.length > 16 ? 96 : 124

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '68px 76px',
        backgroundImage:
          'radial-gradient(circle at 80% 12%, rgba(255,255,255,0.18), transparent 52%), radial-gradient(circle at 6% 96%, rgba(255,255,255,0.10), transparent 46%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 21,
          letterSpacing: 7,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        <div style={{ display: 'flex' }}>{eyebrow.toUpperCase()}</div>
        <div style={{ display: 'flex' }}>{meta.toUpperCase()}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: titleSize,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {title.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 29,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 26,
            maxWidth: 920,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 19,
          letterSpacing: 5,
          color: 'rgba(255,255,255,0.38)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 60,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.3)',
            marginRight: 22,
          }}
        />
        <div style={{ display: 'flex' }}>{footer.toUpperCase()}</div>
      </div>
    </div>
  )
}
