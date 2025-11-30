import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BioSection {
  title: string
  content: string
}

export function About() {
  const { t } = useTranslation()
  const sections = t('about.sections', { returnObjects: true }) as BioSection[]

  return (
    <section id="about" className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">{t('about.title')}</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {Array.isArray(sections) && sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
