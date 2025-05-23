import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface ResumePDFProps {
  personal: any;
  skills: any[];
  experiences: any[];
  projects: any[];
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    borderBottom: '1px solid #eee',
    paddingBottom: 2,
  },
  text: {
    marginBottom: 2,
  },
  list: {
    marginLeft: 12,
    marginBottom: 4,
  },
  listItem: {
    marginBottom: 2,
  },
  techStack: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});

const ResumePDF: React.FC<ResumePDFProps> = ({ personal, skills, experiences, projects }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.header}>{personal.name || ''}</Text>
        <Text style={styles.text}>{personal.email || ''} {personal.phone ? `| ${personal.phone}` : ''}</Text>
        {personal.website && <Text style={styles.text}>{personal.website}</Text>}
        {personal.github && <Text style={styles.text}>github.com/{personal.github}</Text>}
        {personal.summary && <Text style={[styles.text, { fontStyle: 'italic', color: '#888' }]}>{personal.summary}</Text>}
      </View>

      {/* Professional Experience */}
      <Text style={styles.subHeader}>Professional Experience</Text>
      <View style={styles.section}>
        {experiences.map((exp: any) => (
          <View key={exp.id} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{exp.position} {exp.company && `@ ${exp.company}`}</Text>
            <Text style={{ color: '#888', fontSize: 10 }}>{exp.location ? `${exp.location}, ` : ''}{exp.dates || exp.duration}</Text>
            {exp.bullets ? (
              <View style={styles.list}>
                {exp.bullets.map((b: string, i: number) => <Text key={i} style={styles.listItem}>• {b}</Text>)}
              </View>
            ) : exp.description && (
              <View style={styles.list}>
                {exp.description.split('\n').map((line: string, i: number) =>
                  line.trim() && <Text key={i} style={styles.listItem}>• {line}</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Projects */}
      <Text style={styles.subHeader}>Projects</Text>
      <View style={styles.section}>
        {projects.map((project: any) => (
          <View key={project.id} style={{ marginBottom: 6 }}>
            <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
            {project.bullets ? (
              <View style={styles.list}>
                {project.bullets.map((b: string, i: number) => <Text key={i} style={styles.listItem}>• {b}</Text>)}
              </View>
            ) : project.description && (
              <View style={styles.list}>
                {project.description.split('\n').map((line: string, i: number) =>
                  line.trim() && <Text key={i} style={styles.listItem}>• {line}</Text>
                )}
              </View>
            )}
            {project.tech_stack && (
              <Text style={styles.techStack}>Tech Stack: {project.tech_stack}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Skills */}
      <Text style={styles.subHeader}>Skills</Text>
      <View style={styles.section}>
        <Text>{skills.map((skill: any) => skill.name).join(', ')}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF; 