#!/bin/bash

# Create CvEducation
cat > /Users/pavel/Projects/mysite/Code/bupaev.github.io/nextjs-app/components/CvEducation/CvEducation.tsx << 'EOF'
export default function CvEducation() {
  return (
    <div className="education container">
      <h2 className="title is-2">
        Education
      </h2>
      <div className="content">
        <h3>Endless professional self-development</h3>
        <p>
          Udemy, Coursera, Skillbox, JavaScript.Ninja, Refactoring.Guru and infinite number of articles, books and Youtube videos
        </p>
        <h3>
          Doctor of Philosophy (postgraduate student), Computer science (unfinished)
        </h3>
        <p>
          Omsk State Technical University, 2013 - 2015.
        </p>
        <h3>Master of Science, Computer science</h3>
        <p>
          Omsk State Technical University, 2009-2011 - GPA 4.9/5.0
        </p>
        <h3>Bachelor of Science, Computer science</h3>
        <p>
          Omsk State Technical University, 2005-2009 - GPA 4.6/5.0
        </p>
      </div>
    </div>
  )
}
EOF

# Create simple placeholder components
cat > /Users/pavel/Projects/mysite/Code/bupaev.github.io/nextjs-app/components/CvVerticalMenu/CvVerticalMenu.tsx << 'EOF'
'use client'

export default function CvVerticalMenu({ style }: { style?: React.CSSProperties }) {
  return (
    <nav className="vertical-menu" style={style}>
      <div>
        {['Hello!', 'Overview', 'Skills', 'Experience', 'Education'].map((title, i) => (
          <div key={i} className="item">
            <span className="item-text">{title}</span>
          </div>
        ))}
      </div>
    </nav>
  )
}
EOF

cat > /Users/pavel/Projects/mysite/Code/bupaev.github.io/nextjs-app/components/CvOverview/CvOverview.tsx << 'EOF'
export default function CvOverview() {
  return (
    <div className="container">
      <h2 className="title is-2">Overview</h2>
      <div className="content">
        <p>Overview content placeholder</p>
      </div>
    </div>
  )
}
EOF

cat > /Users/pavel/Projects/mysite/Code/bupaev.github.io/nextjs-app/components/CvSkills/CvSkills.tsx << 'EOF'
export default function CvSkills() {
  return (
    <div className="container">
      <h2 className="title is-2">Skills</h2>
      <div className="content">
        <p>Skills content placeholder</p>
      </div>
    </div>
  )
}
EOF

cat > /Users/pavel/Projects/mysite/Code/bupaev.github.io/nextjs-app/components/CvExperience/CvExperience.tsx << 'EOF'
export default function CvExperience() {
  return (
    <div className="container">
      <h2 className="title is-2">Experience</h2>
      <div className="content">
        <p>Experience content placeholder</p>
      </div>
    </div>
  )
}
EOF

echo "Components created successfully"
