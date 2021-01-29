/*
 * C S O U N D
 *
 * L I C E N S E
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

define('InputSpiroPanel', [], function() {

	function InputSpiroPanel(csound) {
		var processSlider = function (sliderName, channelName) {
			var controlSlider = document.getElementById(sliderName);
			var controlSliderValue = document.getElementById(sliderName + "Value");

			controlSlider.oninput = function() {
				controlSliderValue.value = controlSlider.value;
				csound.setControlChannel(channelName, controlSlider.value);
			};
		};
		var audioInputButton = document.getElementById("AudioInputButton");
		var midiInputButton = document.getElementById("MidiInputButton");

		processSlider("ControlHoleSlider", "hole");
		processSlider("ControlPhaseSlider", "phase");
		processSlider("ControlWheelSlider", "wheel");
		processSlider("ControlPhase2Slider", "phase2");
		processSlider("ControlFigsSlider", "figs");

		audioInputButton.onchange = function() {

			if (audioInputButton.checked === false) {

				csound.disableAudioInput();
				return;
			}

			var audioInputCallback = function(status) {

				if (status === true) {

					audioInputButton.checked = true;
				}
				else {

					audioInputButton.checked = false;
				}
			};

			csound.enableAudioInput(audioInputCallback);
		};

		midiInputButton.onchange = function() {

			var midiInputCallback = function(status) {

				if (status === true) {

					midiInputButton.checked = true;
				}
				else {

					midiInputButton.checked = false;
				}
			};

			csound.enableMidiInput(midiInputCallback);
		};
	}


	return InputSpiroPanel;


});
