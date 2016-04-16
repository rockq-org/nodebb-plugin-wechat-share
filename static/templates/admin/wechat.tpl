<h1>微信分享设置</h1>
<hr />

<form>
	<div>
		<p>
			<label for="AppId">AppId</label>
			<input type="text" data-field="wechat-share:appId" title="AppId" class="form-control" placeholder="AppId"><br />
			<label for="AppSecret">AppSecret</label>
			<input type="text" data-field="wechat-share:appSecret" title="AppSecret" class="form-control" placeholder="AppSecret">
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
	require(['admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>