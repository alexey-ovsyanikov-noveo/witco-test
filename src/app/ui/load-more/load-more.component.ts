import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent {
  @Output()
  public more = new EventEmitter<void>();

  @Input()
  public disabled = false;

  public onLoadMore(): void {
    this.more.emit();
  }
}
