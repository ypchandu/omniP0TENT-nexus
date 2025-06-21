import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // ← brings in NgFor, NgIf

interface SkillCategory {
  name: string;
  items: string[];
}

@Component({
  selector: 'app-skill-stack',
  standalone: true,                             // ← mark as standalone
  imports: [CommonModule],                      // ← import CommonModule
  templateUrl: './skill-stack.component.html',
  styleUrls: ['./skill-stack.component.css']
})
export class SkillStackComponent {
  skills: SkillCategory[] = [
    { name: 'Programming',      items: ['Python','Pandas','PySpark','NumPy','TensorFlow','Matplotlib','PyTorch','R (Basic)','VBA'] },
    { name: 'Databases',        items: ['MySQL','NoSQL'] },
    { name: 'Cloud Platforms',  items: ['AWS'] },
    { name: 'Tools & Tech',     items: ['Tableau','Docker','Git','Linux','Excel','Outlook','Jira'] }
  ];
}
