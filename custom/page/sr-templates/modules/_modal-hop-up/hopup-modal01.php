<!-- Module Hop-up 01 start -->
<script type="text/javascript">
	$(function() {
		loadCSS("launchpad/modules/modal-hop-up/hopup-modal01.css");

		var loadJS = [
			'launchpad/modules/modal-hop-up/hopup-modal.js'
			];

		// This is executed once all scripts are loaded
		loadAndExecuteScripts(loadJS, 0, function () {

			$('.hopup-modal').hopupModal({
				trigger: 'exit',    				// Options: exit | slide | timer
				// showOnce: 'true',      				// Show modal only once per session
				// triggerTime: 10,  				// Triggers modal after 10 seconds
				// triggerPosition: '70,    		// Triggers modal when 70% of he page is scrolled
			});

		});
	});
</script>

<div class="hopup-modal" style="opacity: 0; display:none;">
    <div class="hopup-modal-inner">

			<!--HubSpot Call-to-Action Code -->
			<span class="hs-cta-wrapper" id="hs-cta-wrapper-a82d4851-81be-480f-923c-b1f2112d24a4">
			    <span class="hs-cta-node hs-cta-a82d4851-81be-480f-923c-b1f2112d24a4" id="hs-cta-a82d4851-81be-480f-923c-b1f2112d24a4">
			        <!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]-->
			        <a href="http://cta-redirect.hubspot.com/cta/redirect/275827/a82d4851-81be-480f-923c-b1f2112d24a4"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-a82d4851-81be-480f-923c-b1f2112d24a4" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/275827/a82d4851-81be-480f-923c-b1f2112d24a4.png"  alt="New Call-to-action"/></a>
			    </span>
			    <script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script>
			    <script type="text/javascript">
			        hbspt.cta.load(275827, 'a82d4851-81be-480f-923c-b1f2112d24a4', {});
			    </script>
			</span>
			<!-- end HubSpot Call-to-Action Code -->

		<div class="hopup-modal-close" style="background: url('http://www.lean-labs.com/hubfs/img/close.png') 50% 50% / cover;"></div>
	</div>
</div>
<!-- Module Hop-up 01 end -->
