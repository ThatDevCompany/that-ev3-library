import {BuildUtils} from 'that-dev-library';
import 'rxjs/add/operator/mergeMap';

BuildUtils
	.clean('dist/')
	.mergeMap(() => BuildUtils.tsc('tsconfig.json'))
	.mergeMap(() => BuildUtils.copy('README.md', 'dist'))
	.mergeMap(() => BuildUtils.copy('LICENSE', 'dist'))
	.subscribe();
