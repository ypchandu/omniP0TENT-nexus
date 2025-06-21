import { Component } from '@angular/core';

interface SkillCategory {
  name: string;
  items: string[];
}

@Component({
  selector: 'app-skill-stack',
  templateUrl: './skill-stack.component.html',
  styleUrls: ['./skill-stack.component.css']
})
export class SkillStackComponent {
  skills: SkillCategory[] = [
    {
      name: 'Programming',
      items: [
        'Python', 'Pandas', 'PySpark', 'NumPy', 'TensorFlow',
        'Matplotlib', 'PyTorch', 'R (Basic)', 'VBA'
      ]
    },
    {
      name: 'Databases',
      items: ['MySQL', 'NoSQL']
    },
    {
      name: 'Cloud Platforms',
      items: ['AWS']
    },
    {
      name: 'Tools & Technologies',
      items: [
        'Tableau', 'Docker', 'Git', 'Linux', 'Microsoft Office',
        'Excel', 'Outlook', 'Jira', 'Metasploit', 'Seamless AI',
        'ZoomInfo', 'Sales Navigator', 'Hunter IO'
      ]
    }
  ];
}
