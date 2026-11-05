HTHK Intranet — UAT static package
==================================

Deploy this entire folder to your UAT web server (IIS, nginx, Apache).
Set index.html as the default document for the site or app.

Quick links (replace <host> with your UAT URL):
  Mock — SharePoint Kit 2:  <host>/index.html?design=kit2&embed=1
  Mock — SharePoint Kit 1:  <host>/index.html?design=kit
  Mock — Task-first layout:   <host>/index.html?design=task
  News hub:                   <host>/index.html?design=kit2&embed=1#kit-all-news
  Layout guide:               <host>/sharepoint-kit-homepage-guide.html

Refresh package after design changes (from repo root):
  cd figma_ai && npm run build
  rm -rf hthk_intranet && mkdir hthk_intranet
  cp -R figma_ai/dist/. hthk_intranet/
  cp sharepoint-kit-homepage-guide.html hthk_intranet/
  (re-apply guide path patches or run your pack script)

Zip for upload:
  cd hthk_intranet && zip -r ../HTHK_intranet_UAT.zip .

Do not upload node_modules or figma_ai/src — only this folder.
