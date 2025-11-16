import Slash from '../Slash/Slash'
import Timeline from './Timeline'
import styles from './CvExperience.module.scss'

export default function CvExperience() {
  return (
    <div className={`${styles.experience} container`}>
      <h2 className="title is-2">
        Experience
      </h2>
      <div className="mt-5 mb-5">
        <Timeline />
      </div>
      <div className="content">
        <section id="epam" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Lead Front-end engineer</span>
            <span className={styles.company}><Slash /><a href="https://www.epam.com/" target="_blank" rel="noopener noreferrer">EPAM</a></span>
            <span className={styles.interval}><Slash />2022 - Now</span>
          </h3>
          <p>
            <em>EPAM Systems, Inc. is an American company that specializes in software engineering services, digital platform engineering, and digital product design.</em>
          </p>
        </section>
        <section id="holmusk" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Lead Front-end developer</span>
            <span className={styles.company}><Slash /><a href="https://www.holmusk.com/" target="_blank" rel="noopener noreferrer">Holmusk</a></span>
            <span className={styles.interval}><Slash />2018 - 2021</span>
          </h3>
          <p>
            <em>Holmusk is a data science and health technology company that aims to reverse chronic disease and behavioral health issues.</em>
          </p>
          <h4>Used Skills</h4>
          <p>
            VueJS (with Vuex and Vue Router), Vuetify, TypeScript, Jest, Vue Test Utils, FHIR API, HTML5/CSS3,
            SASS, UX expertise, Team leading, SCRUM
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Delivered a complex front-end application (electronic health record system) with Vue and RESTful FHIR API</li>
            <li>Communicated with product managers and coordinated with BA, QA and back-end developers to deliver the quality product</li>
            <li>Analyzed the product design complexity, planned the workload, communicated the risks; ensured the technical feasibility of UI/UX designs</li>
            <li>Performed unit, integration, and performance testing</li>
            <li>Led the team, established and maintained code quality standards</li>
            <li>Fine-tuned middle-fidelity wireframes, creating interfaces based on wireframes and UI library</li>
            <li>Documented code and design of the product</li>
          </ul>
          <h4>Challenges</h4>
          <p>
            Working with <a href="http://hl7.org/fhir/" target="_blank" rel="noopener noreferrer">FHIR API</a> requires a deep dive into the extremely sophisticated domain of
            Healthcare data management.
            However, that was worth it because FHIR is a great architectural example of a good organization of complex real data structures.
            <br />
            Also, it was my first serious experience of fully remote work with a team distributed in six different time zones from West Coast (UTC-8) to
            Singapore (UTC+8).
          </p>
        </section>
        <section id="codenetix" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Lead UI/Front-end developer</span>
            <span className={styles.company}><Slash /><a href="http://cdntx.paulbu.com" target="_blank" rel="noopener noreferrer">Codenetix</a></span>
            <span className={styles.interval}><Slash />2016 - 2018</span>
          </h3>
          <p>
            <em>CODENETIX is a software agency with the focus on complex custom solutions and just a dream team of passionate skillful specialists︎</em>
          </p>
          <h4>Used Skills</h4>
          <p>
            ES6, React (with React Router, Redux, SAGA), Gatsby, HTML5/SCSS, CSS and Canvas animation, Docker, UX/UI expertise, Agile
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Developed and managed robust codebases with appealing interfaces for a variety of applications, from design to production</li>
            <li>Made interactive multimedia content and complex animations with Canvas and HTML/CSS</li>
            <li>Defined overall technology direction for the company projects</li>
            <li>Led and mentored the team, established and maintained high code quality standards and best practices</li>
            <li>Assisted in the collection and documentation of user&apos;s requirements, development of user stories, estimates and work plans</li>
            <li>Created wireframes and prototypes, occasionally took up UX/UI-design tasks</li>
          </ul>
          <h4>Challenges</h4>
          <p>
            This position gave me a lot of new professional experience. I joined the team at an early stage of its formation
            and took an active part in its growth and development, forming a great front-end team from scratch.
            It was an exceptional experience performing many roles and quickly switching between them and tasks,
            often outside the front-end of development.
          </p>
        </section>
        <section id="bandlab" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Front-end developer</span>
            <span className={styles.company}><Slash /><a href="https://www.bandlab.com/" target="_blank" rel="noopener noreferrer">Bandlab</a></span>
            <span className={styles.interval}><Slash />2014 - 2016</span>
          </h3>
          <p>
            <em>BandLab is a Singapore based social music creation platform, the combination of social network, multitrack audio workstation and
              VCS-like
              music storage</em>
          </p>
          <h4>Used Skills</h4>
          <p>
            Vanilla JS ES5/ES6, AngularJS 1.x, Web Audio API, HTML5, SASS, Canvas, SVG, WebWorkers, IndexedDB, Local Storage, WebRTC, Agile
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Developed a browser-based multitrack digital audio workstation with AngularJS 1.x. and Web Audio API</li>
          </ul>
          <h4>Challenges</h4>
          <p>
            Making SPA with functionality of GarageBand was an ambiguous challenge that required strong JavaScript skills, profound knowledge of digital
            signal processing and Web Audio API.
            I faced many nontrivial tasks on the way such as multitrack sound mixing, adding audio effects, audio latency detection, sound pitch
            detection with the use of Fourier analysis and autocorrelation, and so on. The solution of these issues required good math skills, rational
            usage of design patterns and understanding of sound nature.
            Eventually, I am proud of having taken part in creating one of the best web-based audio workstations of today.
          </p>
        </section>
        <section id="luxoft" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Front-end developer</span>
            <span className={styles.company}><Slash /><a href="http://www.luxoft.com/" target="_blank" rel="noopener noreferrer">DXC Luxoft</a></span>
            <span className={styles.interval}><Slash />2012 - 2014</span>
          </h3>
          <p>
            <em>Luxoft is a DXC Technology Company, is a digital strategy and software engineering firm, with about 13k employees within its 41 offices
              in
              22 countries.</em>
          </p>
          <h4>Used Skills</h4>
          <p>
            HTML5, CSS3, LESS, VanillaJS, jQuery, XSLT with .NET-driven CMS (Sitecore, Sharepoint), UI/UX expertise, Agile
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>
              Created adaptive HTML5/CSS3 layouts with jQuery for projects such as PromSvyazBank public site,
              LikePR OneClick Yakutsk platform, M-Video internal services
            </li>
            <li>Assisted in the collection and documentation of user&apos;s requirements, development of user stories, estimates and work plans</li>
            <li>Optimized front-end for high load sites and mobile devices</li>
            <li>Managed a small team of front-end developers</li>
          </ul>
          <h4>Challenges</h4>
          <p>
            Crafting top notch interfaces for large companies, developing interactive maps, complex client-side data validation and calculations
            (loan calculators, credit wizards, etc.)
          </p>
        </section>
        <section id="mirIt" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Web developer</span>
            <span className={styles.company}><Slash /><a href="http://mir-it.info/" target="_blank" rel="noopener noreferrer">Mir IT</a></span>
            <span className={styles.interval}><Slash />2011 - 2012</span>
          </h3>
          <p>
            <em>
              Mir IT is a small software company focused on web development, design and SEO services
            </em>
          </p>
          <h4>Used Skills</h4>
          <p>
            PHP, HTML5, CSS, JavaScript, jQuery, C#, ADO.NET, MS SQL Server, MySQL
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Developed and tested web sites with LAMP stack and HTML/CSS/jQuery</li>
            <li>Developed electronic document management systems with C# and MS SQL/SQLite</li>
          </ul>
        </section>
        <section id="omstu" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Teaching Assistant</span>
            <span className={styles.company}><Slash /><a href="http://omgtu.ru/" target="_blank" rel="noopener noreferrer">Omsk State Technical University</a></span>
            <span className={styles.interval}><Slash />2009 – 2014</span>
          </h3>
          <p>
            <em>
              Omsk State Technical University (OmSTU) is a scientific-technological university which trains engineers, economists and classical
              scholars.
              OmSTU offers over 40 Bachelor degree programmes and 32 Master of Science degree programmes, 23 Doctoral programmes.
            </em>
          </p>
          <h4>Used Skills</h4>
          <p>
            Public speech, explanation and communication skills, research.
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Developed and conducted courses (Artificial Intelligence Systems, Decision Support System)</li>
            <li>Set up and conducted practical classes (Control theory)</li>
            <li>Conducted exams and assessed students` knowledge</li>
          </ul>
        </section>
        <section id="freelance" className={styles['job-record']}>
          <h3>
            <span className={styles['job-title']}>Software developer, 3D modeller, Photographer</span>
            <span className={styles.company}><Slash />Freelance</span>
            <span className={styles.interval}><Slash />2008 – 2011</span>
          </h3>
          <p>
            <em>Working on a wide range of projects has given me a better understanding of what I would like to do in my life</em>
          </p>
          <h4>Used Skills</h4>
          <p>
            HTML5, CSS, JavaScript, PHP, C#/ASP.NET, MySQL, 3Ds Max, Sony Vegas, Adobe Photoshop, Adobe Lightroom
          </p>
          <h4>Responsibilities</h4>
          <ul>
            <li>Web design and programming with HTML5, CSS3, JavaScript ES5, PHP, C#/ASP.NET, MySQL, etc.</li>
            <li>3d-modelling and animation, video editing</li>
            <li>Event and studio photography</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
