
const responses = {
  technical: [
    "Key technical skills for engineering students include:",
    "• Programming (Python, MATLAB, C++)",
    "• CAD software proficiency",
    "• Data analysis and visualization",
    "• Version control (Git)",
    "• Basic web development",
    "• Problem-solving and debugging"
  ].join('\n'),

  programming: [
    "Engineering students should consider learning:",
    "• Python - Great for automation and data analysis",
    "• MATLAB - Essential for numerical computing",
    "• C/C++ - Important for embedded systems",
    "• JavaScript - Useful for web applications",
    "• SQL - Important for database management"
  ].join('\n'),

  soft: [
    "Important soft skills for engineers include:",
    "• Communication",
    "• Teamwork",
    "• Project management",
    "• Time management",
    "• Problem-solving",
    "• Adaptability",
    "• Leadership"
  ].join('\n'),

  certifications: [
    "Valuable certifications and experiences include:",
    "• Industry-specific certifications (e.g., AWS, CISCO)",
    "• Professional Engineering (PE) license",
    "• Six Sigma certification",
    "• Internships at engineering firms",
    "• Research experiences",
    "• Engineering competition participation"
  ].join('\n'),

  communication: [
    "To improve communication skills:",
    "• Join engineering clubs or societies",
    "• Practice technical presentations",
    "• Participate in team projects",
    "• Take technical writing courses",
    "• Attend industry conferences",
    "• Find a mentor in your field"
  ].join('\n')
};

export function getBotResponse(input: string): { type: 'bot', content: string } {
  // Check for technical skills questions
  if (input.includes('technical') || input.includes('skills')) {
    return { type: 'bot', content: responses.technical };
  }
  
  // Check for programming languages questions
  if (input.includes('programming') || input.includes('language')) {
    return { type: 'bot', content: responses.programming };
  }
  
  // Check for soft skills questions
  if (input.includes('soft') || input.includes('personal')) {
    return { type: 'bot', content: responses.soft };
  }
  
  // Check for certification/internship questions
  if (input.includes('certification') || input.includes('internship')) {
    return { type: 'bot', content: responses.certifications };
  }
  
  // Check for communication skills questions
  if (input.includes('communication') || input.includes('speak') || input.includes('present')) {
    return { type: 'bot', content: responses.communication };
  }
  
  // Default response for unrecognized questions
  return {
    type: 'bot',
    content: "I'm here to help you! Please try rephrasing your question."
  };
}
