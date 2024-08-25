import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cdt-tags-list',
  standalone: true,
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  private _tags: string[] = [];

  @Input()
  set tags(value: string[]) {
    // Ensure tags contain only full words
    this._tags = value.filter(tag => tag.trim().length > 0 && !/\s/.test(tag));
  }

  get tags(): string[] {
    return this._tags;
  }

  @Output() setListTag: EventEmitter<string> = new EventEmitter();
}
