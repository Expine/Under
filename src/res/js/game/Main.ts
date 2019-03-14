import { TitleScene } from './scene/TitleScene';
import { MainBuilder } from './MainBuilder';

// Play title scene
new MainBuilder().build().execute(new TitleScene());
