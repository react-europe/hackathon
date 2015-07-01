module.exports = {
	// app
	'home': require('./views/home'),
	'test' : require('./views/test'),
	'custom-list': require('./customViews/submissionList'),
	'url-list': require('./customViews/urlList'),
	// components
	'component-feedback': require('./views/component/feedback'),

	'component-headerbar': require('./views/component/bar-header'),
	'component-headerbar-search': require('./views/component/bar-header-search'),
	'component-alertbar': require('./views/component/bar-alert'),
	'component-actionbar': require('./views/component/bar-action'),
	'component-footerbar': require('./views/component/bar-footer'),

	'component-passcode': require('./views/component/passcode'),
	'component-toggle': require('./views/component/toggle'),
	'component-form': require('./views/component/form'),

	'component-simple-list': require('./views/component/list-simple'),
	'component-complex-list': require('./views/component/list-complex'),
	'component-categorised-list': require('./views/component/list-categorised'),

	// transitions
	'transitions': require('./views/transitions'),
	'transitions-target': require('./views/transitions-target'),

	// details view
	'details': require('./views/details'),
	'radio-list': require('./views/radio-list')
}